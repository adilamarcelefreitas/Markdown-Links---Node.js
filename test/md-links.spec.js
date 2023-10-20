const { mdLinks, validate, normalizeURL, readMarkdownFile } = require('../src/mdLinks.js');


test('normalizeURL should add "http://" to the URL if it does not start with "http"', () => {
  const url = 'example.com';
  const normalized = normalizeURL(url);
  expect(normalized).toBe('http://example.com');
});

test('normalizeURL should not modify the URL if it starts with "http"', () => {
  const url = 'http://example.com';
  const normalized = normalizeURL(url);
  expect(normalized).toBe('http://example.com');
});

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

test('validate should return a FAIL status for an invalid link', () => {
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
    expect(result.ok).toBe('FAIL');
    expect(result.status).toBe(404);
  });
});


test('mdLinks should return an array of links', async () => {
  const filePath = 'test.md';
  const options = {};
  const result = await mdLinks(filePath, options);
  expect(Array.isArray(result)).toBe(true);
  
});

test('mdLinks should validate links if options.validate is true', async () => {
  const filePath = 'test.md';
  const options = { validate: true };
  const result = await mdLinks(filePath, options);
  expect(Array.isArray(result)).toBe(true);
  result.forEach((link) => {
    expect(link.ok === 'ok' || link.ok === 'fail').toBe(true);
  });
});

test('mdLinks should return link statistics if options.stats is true', async () => {
  const filePath = 'test.md';
  const options = { stats: true };
  const result = await mdLinks(filePath, options);
  expect(result.total).toBeDefined();
  expect(result.unique).toBeDefined();
  expect(result.broken).toBeDefined();
});
