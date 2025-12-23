import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const products = [
    { id: 1, name: 'Running Shoes', description: 'Comfortable and stylish running shoes.' },
    { id: 2, name: 'Basketball Shoes', description: 'High-performance basketball shoes.' },
    { id: 3, name: 'Casual Shoes', description: 'Everyday casual shoes.' },
];

const Products = () => {
    return (
        <Container>
            <Box sx={{ marginTop: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Products
                </Typography>
                <List>
                    {products?.map((product) => (
                        <ListItem key={product.id}>
                            <ListItemText
                                primary={product.name}
                                secondary={product.description}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default Products;
