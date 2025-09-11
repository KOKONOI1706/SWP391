// This page redirects to the main app

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-electric-blue/5 via-background to-electric-green/5">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-electric-blue to-electric-green rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl text-white">⚡</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-electric-blue to-electric-green bg-clip-text text-transparent">
          EV Charging Station Management
        </h1>
        <p className="text-xl text-muted-foreground">Modern charging infrastructure management system</p>
      </div>
    </div>
  );
};

export default Index;
