const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
let aRes;

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding =
        new NaturalLanguageUnderstandingV1(
            {
                version: '2020-08-01',
                authenticator: new IamAuthenticator({
                    apikey: api_key,
                }),
                serviceUrl: api_url
            }
        );
    
    return naturalLanguageUnderstanding;
    }




const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'document': true
            }
        },
        'language': 'en'
    };

    const nInstance = getNLUInstance();
    nInstance.analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        
        const resHtml = "<table><tr><td>col1</td><td>AAA</td></tr></table>"
        
        return res.send(
            analysisResults.result
        );
    })
    .catch(err => {
        console.log('error:', err);
        return null;
    });
    
});

app.get("/text/sentiment", (req,res) => {
    //return res.send("text sentiment for "+req.query.text);
    
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'document': true
            }
        }
    };
    console.log(getNLUInstance(analyzeParams));
    return res.send(req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

