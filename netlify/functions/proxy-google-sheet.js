const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    // Obtener el nombre de la hoja desde los parámetros de la URL (query string)
    const sheetName = event.queryStringParameters.sheet;

    if (!sheetName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing parameter 'sheet'" }),
      };
    }

    // URL del script de Google Apps con el parámetro de hoja
    const googleSheetUrl = `https://script.google.com/macros/s/AKfycbzKw0JJcKZWC6P30YtZfH_JEkCc-Ddz4Pqi05fQHSLDj2j18p_z-z3ECxbusVl8CZiYrg/exec?sheet=${sheetName}`;
    
    // Hacer la solicitud a Google Apps Script con el nombre de la hoja
    const response = await axios.get(googleSheetUrl);
    console.log("Datos recibidos desde Google Apps Script:", response.data); // Log para depurar
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://metodovillegas.com',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json; charset=utf-8'  // Forzar UTF-8
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error al obtener los datos:", error); // Log de error detallado
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' }),
    };
  }
};
