const axios = require('axios');

exports.handler = async function (event, context) {
  // Responder a la solicitud preflight de CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://metodovillegas.com',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const sheetName = event.queryStringParameters.sheet;

    if (!sheetName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing parameter 'sheet'" }),
      };
    }

    const googleSheetUrl = `https://script.google.com/macros/s/AKfycbw98SQ57haOoOWoK24cO8T4GTyMC9nqQ83_RxTLY3mZuANFEdQs9YEmmxOBaNrFngYhew/exec?sheet=${sheetName}`;
    
    const response = await axios.get(googleSheetUrl);
    console.log("Datos recibidos desde Google Apps Script:", response.data);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://metodovillegas.com',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' }),
    };
  }
};
