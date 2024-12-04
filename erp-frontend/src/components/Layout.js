import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Barra Superior */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Meu ERP
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Barra Lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Cadastro de Funcionários" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Relatórios" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
