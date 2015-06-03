exports = module.exports = function(app) {

  /* seed */
  var information = [
    {
      'title': 'aaaaaa',
      'desc': 'bbbbbb'
    }
  ];

  // API
  app.get('/api/information', function(req, res) {
    res.json(information);
  });

  app.post('/api/information', function(req, res) {
    var body = req.body;
    console.log(body)
    if (!body.buytime && !body.books) {
      res.status(500)
         .send(JSON.stringify({message: 'valid data id!'}));
    }
    information.push(body);
    res.status(200)
       .send(JSON.stringify({message: 'amount!'}));
  });
};