const commands = [
  'cd /home/ubuntu/app/current/server',
  'npm install',
  'npm run production:env',
  'npx prisma db push',
  'npx prisma generate',
  'pm2 startOrRestart ecosystem.config.js --env production',
  'pm2 save',
];
module.exports = {
  apps: [
    {
      name: 'app-server',
      script: 'npm run build && npm run start:prod',
      autorestart: true,
      max_restarts: 50,
      max_memory_restart: '1024M',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      key: './test-task.pem',
      user: 'ubuntu',
      host: 'ec2-35-178-137-158.eu-west-2.compute.amazonaws.com',
      ssh_options: 'StrictHostKeyChecking=no',
      ref: 'origin/main',
      repo: 'git@github.com:dmitrygorbatikov/test-task-abz-agency.git',
      path: '/home/ubuntu/app',
      'post-deploy': commands.join(' && '),
    },
  },
};
