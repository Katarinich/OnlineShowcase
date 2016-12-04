﻿using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using OnlineShowcase.Data.Model;
using System.Data.SqlClient;
using OnlineShowcase.Data.EF.Configuration;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace OnlineShowcase.Data.EF
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private DbSet<ProductCategory> ProductCategorySet
        {
            get { return base.Context.Set<ProductCategory>(); }
        }

        public ProductRepository(DataContext context) : base(context)
        {
        }

        public async override Task<Product> Get(int id)
        {
            var product = await base.Get(id);
            var categories = base.Context.Set<ProductCategory>().Where(pc => pc.ProductId == id).Select(pc => pc.Category).ToList();
            
            product.Categories = categories;

            return product;
        }

        public async override Task<Product[]> Get()
        {
            var products = await base.Get();

            var productIds = products.Select(p => p.Id).ToArray();
            
            var categories = this.ProductCategorySet
                .Where(pc => productIds.Contains(pc.ProductId))
                .Select(pc => new { pc.ProductId, pc.Category })
                .GroupBy(pc => pc.ProductId)
                .ToDictionary(g => g.Key, g => g.Select(c => c.Category).ToList());

            foreach (var product in products)
            {
                if (categories.ContainsKey(product.Id))
                {
                    product.Categories = categories[product.Id];
                }
            }

            return products;
        }

        public override Task<int> Update(Product entity)
        {
            var oldCategories = this.ProductCategorySet
                .Where(pc => pc.ProductId == entity.Id)
                .ToList();

            var newCategories = entity.Categories.Select(c => c.Id).ToList();

            var deletedCategories = oldCategories.Where(oc => newCategories.All(nc => nc != oc.CategoryId));

            base.Context.RemoveRange(deletedCategories);

            var addedCategories = newCategories.Where(nc => oldCategories.All(oc => oc.CategoryId != nc));

            this.ProductCategorySet.AddRange(addedCategories.Select(ac => new ProductCategory { CategoryId = ac, ProductId = entity.Id }));

            return base.Update(entity);
        }

        public async override Task<int> Add(Product entity)
        {
            var id = await base.Add(entity);

            var categories = entity.Categories.Select(c => new ProductCategory { CategoryId = c.Id, ProductId = id }).ToArray();

            this.ProductCategorySet.AddRange(categories);
            await base.Context.SaveChangesAsync();

            return id;
        }

        public async Task IncrementViewsCount(int productId, int increment)
        {
            await base.ExecSP("IncrementProductViews", new SqlParameter("@ProductId", productId), new SqlParameter("@Increment", increment));
        }

        protected override EntityEntry<Product> Attach(Product entity)
        {
            var entry = base.Attach(entity);
            entry.Property("ViewCount").IsModified = false;
            return entry;
        }
    }
}
