const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: ['active', 'inactive', 'pending'][i % 3],
  department: ['Engineering', 'Sales', 'HR', 'Marketing'][i % 4],
  createdAt: new Date(2024, i % 12, (i % 28) + 1).toISOString().split('T')[0]
}));

app.get('/api/users', (req, res) => {
  let { page = 1, pageSize = 10, search = '', status = '' } = req.query;
  
  let filtered = mockData;
  
  if (search) {
    filtered = filtered.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (status) {
    filtered = filtered.filter(u => u.status === status);
  }
  
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + parseInt(pageSize));
  
  res.json({
    data,
    total: filtered.length,
    page: parseInt(page),
    pageSize: parseInt(pageSize)
  });
});

app.get('/api/users/:id', (req, res) => {
  const user = mockData.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  const index = mockData.findIndex(u => u.id === parseInt(req.params.id));
  if (index > -1) {
    mockData.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.get('/api/charts', (req, res) => {
  res.json({
    line: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        { name: 'Sales', data: [820, 932, 901, 934, 1290, 1330] },
        { name: 'Cost', data: [520, 632, 601, 634, 790, 830] }
      ]
    },
    bar: {
      categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      series: [
        { name: '2023', data: [120, 200, 150, 80, 70] },
        { name: '2024', data: [180, 250, 200, 120, 100] }
      ]
    },
    pie: {
      series: [
        { name: 'Direct', value: 335 },
        { name: 'Email', value: 310 },
        { name: 'Ads', value: 234 },
        { name: 'Search', value: 154 }
      ]
    }
  });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});