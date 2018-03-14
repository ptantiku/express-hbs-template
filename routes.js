module.exports = function(app) {
  app.get('/', function (req, res) {
    //req.query
    //req.params
    //req.body

    res.render('home', {
      title: 'Home',
      data: [
        {id: 1, name: 'Alice',  email: 'alice@gmail.com'},
        {id: 2, name: 'Bob', email: 'bob@gmail.com'},
        {id: 3, name: 'Charlie', email: 'charlie@gmail.com'},
      ]
    });
  });
}
