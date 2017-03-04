import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('test/spec/support/jasmine.json');
jasmine.execute();
