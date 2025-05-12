import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function importProducts() {
  try {
    // Read the CSV file
    const csvFilePath = path.join(__dirname, 'prisma', 'products.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    // Parse CSV content
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      quote: '"',
      relax_quotes: true
    });

    console.log(`Found ${records.length} products to import`);

    // Insert products into database
    for (const record of records) {
      try {
        await prisma.product.create({
          data: {
            name: record.name,
            description: record.description,
            price: parseFloat(record.price),
            images: (() => {
              try {
                const parsed = JSON.parse(record.images);
                return Array.isArray(parsed) ? parsed : [parsed];
              } catch {
                return [record.images];
              }
            })(),
            category: record.category,
            stock: parseInt(record.stock)
          }
        });
        console.log(`Imported product: ${record.name}`);
      } catch (error) {
        console.error(`Failed to import product ${record.name}:`, error);
      }
    }

    console.log('Import completed!');
  } catch (error) {
    console.error('Error during import:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importProducts()
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 