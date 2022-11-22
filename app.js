const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const cab = require('./data/cab')
const Handlebars = require('handlebars');

const server = http.createServer((req, res) => {
    const link = url.parse(req.url, true);
    const query = link.query;
    const page = link.pathname;
    console.log(link,req.method)
    if (page == '/index') {
        let t = renderTemplate('index', {})
        res.end(t)
        return
        
    }
    if(page == '/registration' && req.method == 'GET'){
        cab.getAll((err, result) =>{
            // var context = {data: result};
            // let t = renderTemplate('registration', context);
            // // console.log(context);
            // res.end(t);
            let template = renderTemplate('registration', {});
            // console.log(template)
            res.end(template);
        });
    }
    else if(page == '/registration' && req.method == 'POST'){
        console.log('line 27')
        let formData = '';
        req.on('data', function(data){
            formData += data.toString();
        });
        req.on('end', function(){
            let userData = qs.parse(formData);
            console.log(userData)
            cab.addOne(userData.firstName, userData.lastName, userData.password, userData.email, userData.mobile, userData.address, userData.dob, userData.gender, (err, result) =>{
                var context = {
                    result: {
                        success: true,
                        errors: []
                    } 
                };
                if(err){
                    console.log(err);
                    context.result.success = false;
                }
                let t = renderTemplate('registration', context);
                res.end(t)
            })
        })
    }
    // res.end()
 

})

server.listen(80)

function renderTemplate(name,data){
    var filePath = path.join(__dirname, name+".hbs");
    // console.log("line 27")
    // console.log(filePath)
    let templateText = fs.readFileSync(filePath, 'utf8');
    let template = Handlebars.compile(templateText);
    // console.log(template(data))
    return template(data);
}
