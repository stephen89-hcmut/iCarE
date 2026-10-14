import { Container, Typography } from '@mui/material'

export function DashboardPage() {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <Typography component="h1" variant="h4">
        VehicleCare
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Quản lý chi phí và lịch bảo dưỡng phương tiện
      </Typography>
    </Container>
  )
}
