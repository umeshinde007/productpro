const http=require('http');
const fs=require('fs');
const url=require('url')


const html = fs.readFileSync('./templates/index.html','utf-8');
const producthtml = fs.readFileSync('./templates/productlist.html','utf-8');
const productDetailhtml = fs.readFileSync('./templates/productDetail.html','utf-8');


const productData=JSON.parse(fs.readFileSync('./data/sample.json','utf-8'))

const productlistArray=productData.products.map((prod)=>{

    let output=producthtml.replace('{{%image%}}',prod.images[0]);
    output=output.replace('{{%name%}}',prod.name);
    output=output.replace('{{%category%}}',prod.category);
    output=output.replace('{{%price%}}',prod.price);
    output=output.replace('{{%stock%}}',prod.stock);
    output=output.replace('{{%rating%}}',prod.rating);
    output=output.replace('{{%description%}}',prod.description);
    output=output.replace('{{%id%}}',prod.id);


    return output; 
})

function replaceHtml(template,prod){
    let output=template.replace('{{%image%}}',prod.images[0]);
    output=output.replace('{{%name%}}',prod.name);
    output=output.replace('{{%category%}}',prod.category);
    output=output.replace('{{%price%}}',prod.price);
    output=output.replace('{{%stock%}}',prod.stock);
    output=output.replace('{{%rating%}}',prod.rating);
    output=output.replace('{{%description%}}',prod.description);
    output=output.replace('{{%id%}}',prod.id);
    return output;
}

const server=http.createServer((request,response)=>{
let {query,pathname:path}=url.parse(request.url,true);
    
    //let path=request.url;

    // response.end(path);
    if(path==='/' || path==='/home'){
        response.writeHead(200,{

            'my-header':'This is my custom header'
        })
        response.end(html.replace('{{%content%}}','Welcome to Our Website'))
    }else if(path ==='/about'){
        response.writeHead(200,{

            'my-header':'This is my custom header'
        })
        response.end(html.replace('{{%content%}}','Welcome to About Page of Website'));
    }else if(path ==='/product'){
        if(!query.id){
            response.writeHead(200,{
                'Content-Type':'text/html'
            })
            let producthtmlarr=productData.products.map((prod)=>{
                return replaceHtml(producthtml,prod)
                       
            })

            let prohtml=html.replace('{{%content%}}',producthtmlarr)
            response.end(prohtml)
        }else{
            
            let products=productData.products[query.id-1]
            let productdetailhtml=replaceHtml(productDetailhtml,products)
            console.log(products)
            response.end(html.replace('{{%content%}}',productdetailhtml))
            //response.end(`this is detailpage id ${query.id}`)
        }
       
    }else{
        response.writeHead(400,{
            
            'my-header':'This is my custom header'
        })
        response.end(html.replace('{{%content%}}','Error : Page Not Found'))
    }
    // response.end(html);    
    // console.log('server created');
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('server working')
})







/******************************* *************************************/


// //reading and writing files
// const fs=require('fs')

// //reading file 
// let readfile=fs.readFileSync('./files/input.txt','utf-8');
// //console.log(readfile)

// //writing a file 
// let data='this is addded using write file syn function';
// let writefile=fs.writeFileSync('./files/output.txt',data)
// console.log(writefile)
/********************************************************************/
//how to create interface and print values then close it 
// const readline=require('readline')

// const rl=readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })

// rl.question("enter your name",(name)=>{
//     console.log(name)
//     rl.close();
// })

// rl.on("close",()=>{
//     console.log('interface closed');
//     process.exit(0);
// })

