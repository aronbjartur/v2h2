import app from '@/app/server/index'; 

export async function GET(request: Request) {
  return app.fetch(request);
}

export async function POST(request: Request) {
  return app.fetch(request);
}

export async function PATCH(request: Request) {
  return app.fetch(request);
}

export async function DELETE(request: Request) {
  return app.fetch(request);
}
