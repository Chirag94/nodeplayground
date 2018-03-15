const Joi=require('joi');

const express=require('express');
const app=express();
app.use(express.json());

var genres=[
    {id:1,name:'Action'},
    {id:2,name:'Adventure'},
    {id:3,name:'Comedy'},
    {id:4,name:'Drama'},
]
//starting the server
app.listen(8080,(req,res)=>{console.log('Server started on 8080')});

//getting all the genres => Get Reuest
app.get('/vidly/api/getGenres',(req,res)=>{res.send(genres)});

//getting a specific genre by id
app.get('/vidly/api/genre/:id',(req,res)=>{
    const genre=genres.find(genre=>genre.id===parseInt( req.params.id));
    return genre?res.send(genre):res.status(404).send('Genre does not exist');
})

//creating a new genre => Post Request
app.post('/vidly/api/createGenres',(req,res)=>{
    const {error}=validateGenre(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    const genre={
        id:genres.length+1,
        name:req.body.name
    };
    genres.push(genre);
    res.send(genre);
})

//updating a genre => Put request 
app.put('/vidly/api/updateGenre/:id',(req,res)=>{
    const genre=genres.find(genre=>genre.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre does not exist');
    const {error}=validateGenre(req.body); 
    if(error) return res.status(400).send(error.details[0].message);    
    genre.name=req.body.name;
    res.send(genre);

})
//validating function
function validateGenre(genre){
    const schema={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(genre,schema);
    
}