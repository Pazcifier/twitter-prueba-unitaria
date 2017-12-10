const expect = require('expect');
var Twit = require('twit');

/*
Para estas pruebas unitarias se usó el framework "mocha",
para correr la prueba solo colocar en consola: npm test
*/

//INICIALIZACIÓN
  /*
  Creación de la varibale tipo Twit a partir del package del mismo nombre.
  Este package nos permite un fácil trabajo con la API de Twitter, solo pasando
  los keys y tokens necesarios de la aplicación
  */
  var Twitter = new Twit ({
    consumer_key:         'cH8V0uRpDcToXC44B5D35uZMj'
  , consumer_secret:      'HlgfhGUzFkQASnSWKFpqBksuew1N5mbCpZc2m4o67vzEN5ca9p'
  , access_token:         '896600635902226432-lR2Bz1Bf0Zl5VYDSi1qEZOdOPAYaKsJ'
  , access_token_secret:  'xSmdvq6ecCRI1n9k7VWZFinf2Dy9uXN0SVPUbqkzsz2vq'
  });

describe('GET /users/show', () => {

  //EJECUCIÓN
  it('debe mostrar un usuario que existe', (done) => {
    /*
    Utilicé mi usuario de Twitter para la prueba, el propio Twit nos proporciona una función llamada 'get'
    en el cual le pasamos el endpoint a trabajar, los parámetros a buscar y un callback.
    Este get como lo estoy trabajando lo que hace es que entra elas pruebasn Twitter y verifica si existe un usuario
    con el username (screen_name) que le estoy proporcionando
    */
    var usuario = 'Pazcifier'
    Twitter.get('users/show', {screen_name: usuario}, function(err, data, res) {

      //VERIFICACIÓN
      expect(data.screen_name).toBe(usuario);
      /*
      El package expect nos permite verificar los errores de una forma más sencilla, es solo una verificación de objetos
      expect va a verificar el dato obtenido de la función 'get' de Twit y va a comprobarla con el usuario que le dimos antes
      Si estas no coninciden, la prueba dará error diciéndonos que el usuario no existe.
      Si coinciden, la prueba pasó y nos imprimirá el nombre y el usuario
      */
      if (err) {
        return done(err);
      } else {
        done();
        /*
        NOTA: Si quiere ver todos los datos quitar del comentario console.log(data);
        Solo dejé el nombre y el usuario para que no haya tanta información en pantalla.
        */
        //console.log(data);
        console.log("Nombre:", data.name);
        console.log("Usuario:", data.screen_name);
      }
    })
  });

  //EJECUCIÓN
  it('debe mostar error si no existe el usuario', (done) => {
    /*
    Para la segunda prueba hay que comprobar si retorna un error si el usuario no existe, para eso
    usamos la misma función 'get' de Twit pero no pasamos ningún parametro, si al verificar da error
    entonces pasó la prueba
    */
    Twitter.get('users/show', {}, function(err, data, res) {

      //VERIFICACIÓN
      if (err) {
        done();
      } else {
        done(data);
      }
    })
  })
})

//FINALIZACIÓN
after(() => {
  /*
  Después de todas las pruebas se coloca la variable de Twitter null
  */
  Twitter = null;
})
