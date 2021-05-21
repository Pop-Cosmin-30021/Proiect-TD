var api = require('./src/api.js').app;
const fs = require('fs');
const rameFilepath = './src/rame.json';

api.get('/rame', function (request, response) {
  response.json(getRame());
});

api.get('/rame/:id', function (request, response) {
  let rama = getRameById(request.params.id);
  if (rama) response.json(rama);
  response.json('not found');
});

api.put('/rame', function (request, response) {
  saveRama(request.body);
  response.json('Rama a fost salvata cu succes!');
});

api.post('/rame', function (request, response) { // functie update
  // in request o sa-mi vina un obiect de tip rama care o sa aiba un anumit id
 // console.log(request.body);//un obiect de tipul rama actualizat pe client
  // citim rama din fisier pe baza id-ului primit de la client
  let rama = request.body;
  let rame = getRame();
  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  //console.log(rame);

  for (let i=0; i< rame.length; i++){
   if(rame[i].id === rama.id){
   rame[i] = rama;
   }
  }
// salvam in fisier produsele actualizate
    try {
      fs.writeFileSync(rameFilepath, JSON.stringify(rame));// salvare json array in fisier
    } catch (err) {
      console.error(err)
    }

  response.json('Rama a fost actualizata!');
});

api.delete('/rame/:index', function (request, response) {
    console.log(request.params.index);
    // cars.splice(request.params.index, 1);
      let rame = [];
        try {
          rame = JSON.parse(fs.readFileSync(rameFilepath, 'utf8'));
        } catch (err) {
          console.error(err);
          return false;
        }



       rame.splice(findIdInArray(request.params.index),1);

       //console.log(rame);

     try {
        fs.writeFileSync(rameFilepath, JSON.stringify(rame));// salvare json array in fisier
      } catch (err) {
        console.error(err)
      }

  response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getRame() {
  let rame = [];
  try {
    rame = JSON.parse(fs.readFileSync(rameFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return rame;
}

function saveRama(rama) {
  let rame = getRame();// citire json din fisier
  //console.log(rame);
  let maxId = getMaxId(rame);  // get maximum id form rame array
  rama.id = maxId+1;// generare id unic
  rame.push(rama);// adaugare rama noua in array
  try {
    fs.writeFileSync(rameFilepath, JSON.stringify(rame));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(rame) {
  let max = 0;
  for (var i=0; i<rame.length;i++) {
    if(max < rame[i].id) {
      max = rame[i].id;
    }
  }
  return max;
}

function getRameById(id){
  let rame = getRame();// citire json din fisier
  let selectedRama = null;
  for(var i=0; i<rame.length; i++) {
    if(id == rame[i].id) selectedRama = rame[i];
  }
  return selectedRama;
}

function findIdInArray(id){
    let rame = getRame();

    for(var i=0; i<rame.length; i++) {
        if(id == rame[i].id)
            return i;
      }

    return -1;
}

//let rame = getRame();
//console.log (getRame());




