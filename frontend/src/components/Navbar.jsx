import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { VOZY_COLORS } from '../theme/theme';

function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: VOZY_COLORS.background }}>
      <Toolbar>
        <img 
          width="96" 
          alt="Vozy" 
          src="https://cdn.prod.website-files.com/624c7936db9c1cbe55c58346/624cbfefd10565cd9f18e364_Vozy%20Logo-03.png"
          style={{ marginRight: "10px" }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
