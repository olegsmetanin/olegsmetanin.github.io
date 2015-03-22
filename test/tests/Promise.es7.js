describe('Promise', function () {
    describe('.then()', () => {
        it('is .map()', () => {
            return Promise.resolve('first')
                .then(() => 'second')
                .should.be.finally.equal('second');

        }),
        it('is .flatMap()', () => {
            return Promise.resolve('first')
                .then(() => Promise.resolve('second'))
                .should.be.finally.equal('second')
                .and.be.a.String;
        });
    });
});
