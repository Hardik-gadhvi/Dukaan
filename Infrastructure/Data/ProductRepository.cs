using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ProductRepository(StoreContext context)  : IProductRepository
    {
        public void AddProduct(Product product)
        {
            context.Products.Add(product);
        }

        public void DeleteProduct(Product product)
        {
            context.Products.Remove(product);
        }

        public async Task<IReadOnlyList<Product>> GetAllProductsAsync(string? brand, string? type, string? sort)
        {
            var quary = context.Products.AsQueryable();

            if(!string.IsNullOrWhiteSpace(brand))
                quary = quary.Where(x => x.Brand == brand);

            if (!string.IsNullOrWhiteSpace(type))
                quary = quary.Where(x => x.Type == type);

                quary = sort switch
                {
                    "priceAsc" => quary.OrderBy(x => x.Price),
                    "priceDesc" => quary.OrderByDescending(x => x.Price),
                    _ => quary.OrderBy(x => x.Name)
                };
            
            return await quary.ToListAsync();
        }

        public async Task<IReadOnlyList<string>> GetBrandsAsync()
        {
            return await context.Products.Select(x => x.Brand)
                .Distinct()
                .ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await context.Products.FindAsync(id);
        }

        public async Task<IReadOnlyList<string>> GetTypesAsync()
        {
            return await context.Products.Select(x => x.Type)
                .Distinct()
                .ToListAsync();
        }

        public bool ProductExists(int id)
        {
            return context.Products.Any(p => p.Id == id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void UpdateProduct(Product product)
        {
            context.Entry(product).State = EntityState.Modified;
        }
    }
}
