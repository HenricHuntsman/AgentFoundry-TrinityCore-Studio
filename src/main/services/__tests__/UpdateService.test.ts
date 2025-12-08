import { UpdateService } from '../UpdateService';

describe('UpdateService', () => {
  let updateService: UpdateService;

  beforeEach(() => {
    updateService = new UpdateService();
  });

  describe('validateSQLFile', () => {
    it('should detect unmatched parentheses', async () => {
      // Create a temporary SQL file with errors
      const fs = require('fs/promises');
      const path = require('path');
      const tempFile = path.join('/tmp', 'test-invalid.sql');
      
      await fs.writeFile(tempFile, `
        CREATE TABLE test (
          id INT PRIMARY KEY,
          name VARCHAR(100
        );
      `, 'utf-8');

      const result = await updateService.validateSQLFile(tempFile);
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      // Cleanup
      await fs.unlink(tempFile);
    });

    it('should validate correct SQL syntax', async () => {
      const fs = require('fs/promises');
      const path = require('path');
      const tempFile = path.join('/tmp', 'test-valid.sql');
      
      await fs.writeFile(tempFile, `
        -- Comment
        CREATE TABLE test (
          id INT PRIMARY KEY,
          name VARCHAR(100)
        );
        
        INSERT INTO test (id, name) VALUES (1, 'Test');
      `, 'utf-8');

      const result = await updateService.validateSQLFile(tempFile);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      
      // Cleanup
      await fs.unlink(tempFile);
    });
  });

  describe('validateScript', () => {
    it('should detect unmatched braces in C++ files', async () => {
      const fs = require('fs/promises');
      const path = require('path');
      const tempFile = path.join('/tmp', 'test-invalid.cpp');
      
      await fs.writeFile(tempFile, `
        #include <iostream>
        
        int main() {
          std::cout << "Hello";
          // Missing closing brace
      `, 'utf-8');

      const result = await updateService.validateScript(tempFile, 'cpp');
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      // Cleanup
      await fs.unlink(tempFile);
    });

    it('should validate correct C++ syntax', async () => {
      const fs = require('fs/promises');
      const path = require('path');
      const tempFile = path.join('/tmp', 'test-valid.cpp');
      
      await fs.writeFile(tempFile, `
        #include <iostream>
        
        int main() {
          std::cout << "Hello World" << std::endl;
          return 0;
        }
      `, 'utf-8');

      const result = await updateService.validateScript(tempFile, 'cpp');
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      
      // Cleanup
      await fs.unlink(tempFile);
    });
  });
});
