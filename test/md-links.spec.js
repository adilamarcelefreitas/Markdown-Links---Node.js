const { mdLinks, validate, normalizeURL, readFiles } = require('../src/mdLinks.js');


//function normalizeURL
test('normalizeURL should add "http://" to the URL if it does not start with "http"', () => {
  const url = 'example.com';
  const normalized = normalizeURL(url);
  expect(normalized).toBe('http://example.com');
});

//function validate
test('validate should return a PASS status for a valid link', () => {
  const link = { href: 'https://example.com' };
  const responseMock = { statusCode: 200 };
  const requestMock = jest.fn().mockReturnValue({
    on: (event, callback) => {
      if (event === 'response') {
        callback(responseMock);
      }
    },
    end: jest.fn(),
  });

  jest.spyOn(require('https'), 'request').mockImplementation(requestMock);

  return validate(link).then((result) => {
    expect(result.ok).toBe('PASS');
    expect(result.status).toBe(200);
  });
});

test('validate should return a ERROR status for an invalid link', () => {
  const link = { href: 'https://example.com' };
  const responseMock = { statusCode: 404 };
  const requestMock = jest.fn().mockReturnValue({
    on: (event, callback) => {
      if (event === 'response') {
        callback(responseMock);
      }
    },
    end: jest.fn(),
  });

  jest.spyOn(require('https'), 'request').mockImplementation(requestMock);

  return validate(link).then((result) => {
    expect(result.ok).toBe('ERROR');
    expect(result.status).toBe(404);
  });
});

//function readFiles
test('readFiles should read and resolve the content of an existing .md file', () => {
  const filePath = path.join('text.md'); // Path to an existing .md file
  return readFiles(filePath)
    .then((data) => {
      // Assuming the test.md file contains some content
      expect(data).toBeTruthy();
    });
});

test('readFiles should reject with an error for a non-existing .md file', () => {
  const filePath = 'text.md';
  return expect(readFiles(filePath)).rejects.toThrow('Error! File not defined');
});

//function mdLinks
test('mdLinks should return an array of links', async () => {
  const filePath = 'text.md';
  const options = {};
  const result = await mdLinks(filePath, options);
  expect(Array.isArray(result)).toBe(true);
});

test('mdLinks should validate links if options.validate is true', async () => {
  const filePath = 'text.md';
  const options = { validate: true };
  const result = await mdLinks(filePath, options);
  expect(Array.isArray(result)).toBe(true);
  result.forEach((link) => {
    expect(link.ok === 'PASS' || link.ok === 'ERROR').toBe(true);
  });
});

test('mdLinks should return link statistics if options.stats is true', async () => {
  const filePath = 'text.md';
  const options = { stats: true };
  const result = await mdLinks(filePath, options);
  expect(result.total).toBeDefined();
  expect(result.unique).toBeDefined();
  expect(result.broken).toBeDefined();
});
