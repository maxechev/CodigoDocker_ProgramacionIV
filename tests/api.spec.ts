import { test, expect } from '@playwright/test';

// URL base de tu API (en CI será localhost, en local también)
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('API Container Demo - Endpoints', () => {
  
  test('GET / debe retornar mensaje de saludo', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('message', 'Hola desde un contenedor');
    expect(body).toHaveProperty('hostname');
    expect(body).toHaveProperty('node');
  });

  test('GET /health debe retornar estado healthy', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/health`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toEqual({ status: 'healthy' });
  });

  test('GET /info debe retornar la versión 4.0 y estado containerized', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/info`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toEqual({
      app: 'container-demo',
      version: '4.0',
      containerized: true
    });
  });

  test('GET /docs debe retornar la interfaz de Scalar', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/docs`);
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    // Verificamos que el HTML contenga referencias a Scalar o API Reference
    expect(text).toContain('API Reference');
    expect(text).toContain('scalar');
  });
});