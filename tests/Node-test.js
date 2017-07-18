import { expect } from 'chai';
import Node from '../scripts/Node';

describe('Node functionality', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  })

  it.skip('should be a thing', () => {
    expect(node).to.exist
  })

  it.skip('should start out with no letters', () => {
    expect(node.letter).to.equal(null)
  })

  it.skip('should not start out as a word', () => {
    expect(node.isWord).to.equal(false);
  })

  it.skip('should have no children', () => {
    expect(node.children).to.deep.equal({});
  })
})
