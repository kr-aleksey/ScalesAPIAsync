import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const PageNotFound: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '10vh',
      }}
    >
      <Stack display="flex" flexDirection="column" spacing={2}>
        <Typography
          variant="h1"
          component="p"
          textAlign="center"
          fontWeight={300}
        >
          404
        </Typography>
        <Typography variant="h4" component="p">
          Страница не найдена
        </Typography>
      </Stack>
    </Box>
  );
};
