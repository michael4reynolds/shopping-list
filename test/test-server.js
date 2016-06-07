import chai from 'chai'
import chaiHttp from 'chai-http'
import * as server from '../src/server'

const should = chai.should()
const app = server.app
const storage = server.storage

chai.use(chaiHttp)

describe('Shopping List', () => {
  it('should list items on get', (done) => {
    chai.request(app)
      .get('/items')
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        res.body.should.have.length(3)
        res.body[0].should.be.a('object')
        res.body[0].should.have.property('id')
        res.body[0].should.have.property('name')
        res.body[0].id.should.be.a('number')
        res.body[0].name.should.be.a('string')
        res.body[0].name.should.equal('Broad beans')
        res.body[1].name.should.equal('Tomatoes')
        res.body[2].name.should.equal('Peppers')
        done()
      })
  })
  it('should add an item on post', (done) => {
    chai.request(app)
      .post('/items')
      .send({'name': 'Kale'})
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(201)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('id')
        res.body.should.have.property('name')
        res.body.name.should.be.a('string')
        res.body.id.should.be.a('number')
        res.body.name.should.equal('Kale')
        storage.items.should.be.a('array')
        storage.items.should.have.length(4)
        storage.items[3].should.be.a('object')
        storage.items[3].should.have.property('id')
        storage.items[3].should.have.property('name')
        storage.items[3].id.should.be.a('number')
        storage.items[3].name.should.be.a('string')
        storage.items[3].name.should.equal('Kale')
        done()
      })
  })
  it('should edit an item on put', (done) => {
    chai.request(app)
      .put('/items/3')
      .send({'name': 'Plantain'})
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('id')
        res.body.id.should.be.a('number')
        res.body.id.should.equal(3)
        res.body.should.have.property('name')
        res.body.name.should.be.a('string')
        res.body.name.should.equal('Plantain')
        storage.items.should.have.length(4)
        storage.items[3].should.be.a('object')
        storage.items[3].should.have.property('id')
        storage.items[3].id.should.equal(3)
        storage.items[3].name.should.equal('Plantain')
        done()
      })
  })
  it('should delete an item on delete', (done) => {
    storage.items.should.have.length(4)
    chai.request(app)
      .delete('/items/1')
      .end((err, res) => {
        should.equal(err, null)
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('id')
        res.body.id.should.be.a('number')
        res.body.id.should.be.equal(1)
        res.body.should.have.property('name')
        res.body.name.should.be.a('string')
        res.body.name.should.be.equal('Tomatoes')
        storage.items.should.have.length(3)
        storage.items[1].name.should.equal('Peppers')
        done()
      })
  })
})
