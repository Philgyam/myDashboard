import React, { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Search, Trash2, Package, DollarSign, Tag, ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define the Product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string | null;
  status: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 199.99,
      stock: 45,
      image: '/api/placeholder/200/200',
      status: 'In Stock',
    },
    {
      id: '2',
      name: 'Running Shoes',
      category: 'Sports',
      price: 89.99,
      stock: 30,
      image: '/api/placeholder/200/200',
      status: 'Low Stock',
    },
    {
      id: '3',
      name: 'Coffee Maker',
      category: 'Home',
      price: 299.99,
      stock: 15,
      image: '/api/placeholder/200/200',
      status: 'In Stock',
    },
    {
      id: '4',
      name: 'Smartwatch',
      category: 'Electronics',
      price: 249.99,
      stock: 20,
      image: '/api/placeholder/200/200',
      status: 'Low Stock',
    },
    {
      id: '5',
      name: 'Yoga Mat',
      category: 'Sports',
      price: 29.99,
      stock: 50,
      image: '/api/placeholder/200/200',
      status: 'In Stock',
    },
    {
      id: '6',
      name: 'Blender',
      category: 'Home',
      price: 89.99,
      stock: 25,
      image: '/api/placeholder/200/200',
      status: 'In Stock',
    },
    {
      id: '7',
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 49.99,
      stock: 40,
      image: '/api/placeholder/200/200',
      status: 'In Stock',
    },
    {
      id: '8',
      name: 'Leather Jacket',
      category: 'Fashion',
      price: 199.99,
      stock: 10,
      image: '/api/placeholder/200/200',
      status: 'Low Stock',
    }
  ]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'status'>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    image: null,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // New state for confirmation dialog
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const categories = ['Electronics', 'Sports', 'Home', 'Fashion', 'Books'];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddProduct = () => {
    const id = (products.length + 1).toString();
    const status = newProduct.stock <= 20 ? 'Low Stock' : 'In Stock';
    setProducts([...products, { ...newProduct, id, status }]);
    setIsAddModalOpen(false);
    setNewProduct({ name: '', category: '', price: 0, stock: 0, image: null });
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setProductToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleStockChange = (id: string, change: number) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newStock = Math.max(0, product.stock + change);
        return {
          ...product,
          stock: newStock,
          status: newStock <= 20 ? 'Low Stock' : 'In Stock',
        };
      }
      return product;
    }));
  };

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      return a[sortField] > b[sortField] ? direction : -direction;
    });

  const getStatusColor = (status: string) => {
    return status === 'Low Stock' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  const averagePrice = products.length > 0
    ? (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2)
    : '0.00';

  return (
    <div className="p-6 space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black bg-clip-text text-transparent">
          Products
        </h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Add a new product to your inventory</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Select
                value={newProduct.category}
                onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Price"
                value={newProduct.price.toString()}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Stock quantity"
                value={newProduct.stock.toString()}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
              />
              <Input
                type="file"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              />
              {newProduct.image && (
                <img src={URL.createObjectURL(newProduct.image)} alt="Preview" className="w-full h-32 object-cover mt-2" />
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-100 to-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-100 to-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${products.reduce((sum, product) => sum + (product.price * product.stock), 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-100 to-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(products.map(p => p.category)).size}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-100 to-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.status === 'Low Stock').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left text-sm font-medium text-gray-500">Image</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-2">
                  Product Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-2">
                  Category
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('price')}>
                <div className="flex items-center gap-2">
                  Price
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 cursor-pointer" onClick={() => handleSort('stock')}>
                <div className="flex items-center gap-2">
                  Stock
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                </td>
                <td className="p-4 font-medium cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  {product.name}
                </td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStockChange(product.id, -1)}
                    >
                      -
                    </Button>
                    {product.stock}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStockChange(product.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="p-4">
                  <Badge className={getStatusColor(product.status)}>
                    {product.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      setProductToDelete(product);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Confirmation Dialog for Deleting Product */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? 
              Note that customers may have already ordered this product.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteProduct} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-auto" />
                <p className="mt-2"><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Price:</strong> ${selectedProduct.price}</p>
                <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                <p><strong>Status:</strong> <Badge className={getStatusColor(selectedProduct.status)}>{selectedProduct.status}</Badge></p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setSelectedProduct(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-bold">Average Price of Products: ${averagePrice}</h2>
      </div>
    </div>
  );
}