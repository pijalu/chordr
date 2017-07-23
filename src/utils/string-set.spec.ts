import { StringSet } from './string-set';
import { expect } from 'chai';

describe('StringSet', () => {
    it('exits return false when items does not exits', () => {
        const set = new StringSet();
        expect(set.exists('k1')).to.be.equal(false);
    });

    it('exits return true when items exits', () => {
        const set = new StringSet();
        set.add('k1');
        expect(set.exists('k1')).to.be.equal(true);
    });

    it('exits return 0 when empty', () => {
        const set = new StringSet();
        expect(set.size()).to.be.equal(0);
    });

    it('exits return 1 when it contains 1 element', () => {
        const set = new StringSet();
        set.add('one');
        expect(set.size()).to.be.equal(1);
    });

    it('remove works ', () => {
        const set = new StringSet();
        set.add('one');
        set.remove('one');

        expect(set.exists('one')).to.be.equal(false);
        expect(set.size()).to.be.equal(0);
    });
});
