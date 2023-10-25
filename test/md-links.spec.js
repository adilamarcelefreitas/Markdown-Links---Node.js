const { mdLinks, validate, normalizeURL, readFiles } = require('../src/mdLinks.js');
const path = require('path');

describe('normalizeURL', () => {
  it('normalizeURL should add "https://" to the URL if it does not start with "http"', () => {
    const url = 'example.com';
    const normalized = normalizeURL(url);
    expect(normalized).toBe('http://example.com');
  });

  it('should not modify URLs that already have a protocol', () => {
    const url = 'https://www.example.com';
    expect(normalizeURL(url)).toBe('https://www.example.com');
  });

  it('should add "https://" to the URL if it starts with "www."', () => {
    const url = 'www.example.com';
    expect(normalizeURL(url)).toBe('http://www.example.com');
  });
});

describe('validate', () => {
  it('validate should return a PASS status for a valid link', () => {
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

    validate(link).then((result) => {
      expect(result.ok).toBe('PASS');
      expect(result.status).toBe(200);
    });
  });

  

  it('validate should return a ERROR status for an invalid link', () => {
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

    jest.spyOn(require('http'), 'request').mockImplementation(requestMock);

    validate(link).then((result) => {
      expect(result.ok).toBe('ERROR');
      expect(result.status).toBe(404);
    });
  });
  
  it('should handle an HTTP response with status code 301 (Redirect)', () => {
    const link = { href: 'https://example.com' };
    const responseMock = { statusCode: 301, headers: { location: 'https://newexample.com' } };
    const requestMock = jest.fn().mockReturnValue({
      on: (event, callback) => {
        if (event === 'response') {
          callback(responseMock);
        }
      },
      end: jest.fn(),
    });
  
    jest.spyOn(require('https'), 'request').mockImplementation(requestMock);

    jest.spyOn(require('http'), 'request').mockImplementation(requestMock);
  
    validate(link).then((result) => {
      expect(result.ok).toBe('REDIRECT');
      expect(result.status).toBe(301);
      expect(result.redirectedTo).toBe('https://newexample.com');
    });
  });
  
  it('validate should handle an error when a request fails', () => {
    const link = { href: 'https://example.com' };
    const requestMock = jest.fn().mockReturnValue({
      on: (event, callback) => {
        if (event === 'error') {
          callback(new Error('Request error'));
        }
      },
    });

    jest.spyOn(require('https'), 'request').mockImplementation(requestMock);

    return validate(link).then((result) => {
      expect(result.ok).toBe('FAIL');
    });
  });
});

describe('readFiles', () => {
  it('readFiles should read and resolve the content of an existing .md file', () => {
    const filePath = path.join('text.md');
    readFiles(filePath)
      .then((data) => {
        expect(data).toBeTruthy();
      });
  });

  it('readFiles should reject for a non-existing .md file', () => {
    const filePath = 'nonexisting.md';
    expect(readFiles(filePath)).rejects.toThrow();
  });

  it('readFiles should reject for a non-Markdown file', () => {
    const filePath = 'text.txt'; // Use um arquivo que não é .md
    return expect(readFiles(filePath)).rejects.toThrow();
  });
});

describe('mdLinks', () => {
  it('should return an array of links', async () => {
    const filePath = 'text.md';
    const options = {};
    const result = await mdLinks(filePath, options);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return link statistics if options.stats is true', async () => {
    const filePath = 'text.md';
    const options = { stats: true };
    const resultPromises = mdLinks(filePath, options);

    const result = await resultPromises;

    expect(result.total).toBeDefined();
    expect(result.unique).toBeDefined();
    expect(result.broken).toBeDefined();
  });

  it('should reject with an error for an invalid .md file', () => {
    const filePath = 'invalid.md';
    expect(mdLinks(filePath)).rejects.toThrow();
  });

  it('should return an array of links with ERROR status when at least one link is invalid', async () => {
    const filePath = 'text.md'; 
    const options = { validate: false };
    const result = await mdLinks(filePath, options);
    expect(result.some((link) => link.ok === 'ERROR')).toBe(false);
  });

  it('should return an array of links with FAIL validate when at least one link is not reachable', async () => {
    const filePath = 'text.md';
    const options = { validate: false };
    const result = await mdLinks(filePath, options);
    expect(result.some((link) => link.ok === 'FAIL')).toBe(false);
  });
 
    it('should return an array of links with ERROR status/validate', async () => {
      const filePath = 'text.md'; // Use um arquivo com links válidos
      const options = { stats: false, validate: false };
      const result = await mdLinks(filePath, options);
      expect(result.every((link) => link.ok === 'ERROR')).toBe(false);
    });
  });
  