import { StringMap } from './string-map';
import { expect } from 'chai';

describe('StringMap', () => {
    it('exits return false when items does not exits', () => {
        const map = new StringMap<boolean>();
        expect(map.contains('k1')).to.be.equal(false);
    });

    it('exits return true when items exits', () => {
        const map = new StringMap<boolean>();
        map.put('k1', false);
        expect(map.contains('k1')).to.be.equal(true);
    });

    it('exits return the correct value', () => {
        const map = new StringMap<string>();
        map.put('k1', 'value');
        expect(map.get('k1')).to.be.equal('value');
    });

    it('exits return 0 when empty', () => {
        const map = new StringMap();
        expect(map.size()).to.be.equal(0);
    });

    it('exits return 1 when it contains 1 element', () => {
        const map = new StringMap<boolean>();
        map.put('one', true);
        expect(map.size()).to.be.equal(1);
    });

    it('remove works ', () => {
        const map = new StringMap<string>();
        map.put('one', 'two');
        map.remove('one');

        expect(map.contains('one')).to.be.equal(false);
        expect(map.size()).to.be.equal(0);
    });
});
