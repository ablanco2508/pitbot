const express = require('express')
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const app = express()
const flowSecundario = addKeyword(['0', 'siguiente']).addAnswer(['📄 escribe hola, principal o menú para regresar al menú'])

const flowExcel = addKeyword(['1', 'excel']).addAnswer(
    [
        '🚀 Aquí tienes tu archivo en pdf',
        '\n*0* Para siguiente paso.'
    ],
    {media:'C:/Users/ANDRES-PC/Documents/Posma/periodo-pista-455.xlsx'},
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowPdf = addKeyword(['2', 'pdf']).addAnswer(
    [
        '🚀 Aquí tienes tu archivo en pdf',
        '\n*0* Para siguiente paso.'
    ],
    {media:'C:/Users/ANDRES-PC/Documents/Posma/periodo-pista-455.pdf'},
    null,
    [flowSecundario]
)

const flowWeb = addKeyword(['3','web']).addAnswer(
    ['🤪 Nuestra pagína web', 'https://www.4gas.cr/', '\n*0* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['1','2','3','hola', 'Hola', 'principal', 'Principal', 'menu','Menú', 'menú', 'Menú'])
    .addAnswer('🙌 Hola bienvenido a *Pit Bot*')
    .addAnswer(
        [
            'Escribe la opción que requieres',
            '1 *excel* documento excel período de pista',
            '2 *pdf*  documento excel período de pista',
            '3 *web* nuestra pagína web',
        ],
        null,
        null,
        [flowExcel, flowPdf, flowTuto, flowWeb]
    )
    
    
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

   createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    //adapterProvider.sendText('14155238886@c.us', 'Mensaje desde API')
    
    
    

    QRPortalWeb()
}


const listenMassage = async () => {
    client.on('message', (msg)=> {
        const { from, to, body} = msg;
        
        console.log(from, to, body);
    })   
}

main()
