const express = require('express')
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const app = express()
const flowSecundario = addKeyword(['0', 'siguiente']).addAnswer(['📄 escribe hola, principal o menú para regresar al menú'])

const flowExcel = addKeyword(['1', 'excel', 'Excel', 'EXCEL']).addAnswer(
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

const flowPdf = addKeyword(['2', 'pdf', 'Pdf', 'PDF']).addAnswer(
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
const flowResumen = addKeyword(['3','Resumen','resumen'])
    .addAnswer('*PERIODO DE PISTA*')
    .addAnswer('*_________________________________*')
    .addAnswer('*DESPACHO FACTURADO DE COMBUSTIBLE*')
    .addAnswer('*_________________________________*')
    .addAnswer(
        [
            '*Producto Precio Cant. Lts. Monto*',
            'Regular    26,06   372,682  L.9.712,12',
            'Superior   28,04   226,843  L.6.360,66',
            'Diesel     23,76   522,464  L.12.423,49',
            '                *1,121,989  L.28.486,49*',
        ])
    .addAnswer('*_________________________________*')
    .addAnswer(
        [
            '*Total Contado              L.28.486,49*',
            'Ordinario                   L.28.486,49',
            'Prepago                          L.0,00',
            'Total Crédito                    L.0,00',
            'Total Sin Pagar               0,000 Lts',
        ]
        ,
        null,
        null,
        [flowSecundario]
    )
const flowPrincipal = addKeyword(['1','2','3','hola', 'Hola', 'principal', 'Principal', 'menu','Menú', 'menú', 'Menú'])
    .addAnswer('🙌 ¡Hola!, somos 4Gas, bienvenido a *Pit Bot*')
    .addAnswer(
        [
            'Por favor, para consultar el cierre de pista escribe la opción de formato que prefieres:',
            '1 *Excel*',
            '2 *Pdf*',
            '3 *Resumen* en texto',
        ],
        null,
        null,
        [flowExcel, flowPdf, flowTuto, flowResumen]
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
    
    
    //await adapterProvider.sendText(id, templateMessage, { quoted: null })
    

    QRPortalWeb()
}


const listenMassage = async () => {
    client.on('message', (msg)=> {
        const { from, to, body} = msg;
        
        console.log(from, to, body);
    })   
}

main()
