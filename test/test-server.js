import chai from 'chai'
import chaiHttp from 'chai-http'
import * as server from '../src/server'

const should = chai.should()
const app = server.app
const storage = server.storage

chai.use(chaiHttp)

describe('Shopping List', () => {
  it('should list items on get', (done)=> {
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
  it('should add an item on post')
  it('should edit an item on put')
  it('should delete an item on delete')
})
