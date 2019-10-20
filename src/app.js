const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./util/geocode');
const forecast =require('./util/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// setup handlebars engine and view location
app.set('views',viewPath );
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'Anand Babu'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{'title':'Help','message':'This page is to guide you how to use app','name':"Anand Babu"});
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
    name:'Anand Babu'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      err:'address must be provided'
    })
  }

 geoCode(req.query.address,(err,geoData)=>{
    if(err) return res.send({err})
    forecast(geoData,(err,data)=>{
      if(err) return res.send({err})
       res.send({...data,Address:req.query.address})
    })
 })
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
   return res.send({
     error:'you must provide a search term'
   })
  }
  console.log(req.query)
  res.send({
    products:[]
  })

})

app.get('/help/*',(req,res)=>{
  res.render('notFound',{title:'404',name:'Anand Babu',error:'Help article not found'})
})

app.get('*',(req,res)=>{
  res.render('notFound',{title:'404',name:'Anand babu',error:'page not found'})
})

app.listen(port,()=>{
  console.log('server is up on port' + port)
})
