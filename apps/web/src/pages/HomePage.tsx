import React from 'react';

import { WButton, WCard, WCol, WContainer, WRow, WTypography } from '@fintrack/ui-kit';

const HomePage: React.FC = () => {
  return (
    <WContainer>
      <div className='min-h-screen py-8 sm:py-12'>
        {/* Header */}
        <WRow justify='center' className='mb-8 sm:mb-12'>
          <WCol>
            <WTypography variant='h1' className='mb-2 text-center'>
              FinTrack Pro
            </WTypography>
            <WTypography variant='body' color='secondary' className='text-center'>
              Умный способ управлять финансами
            </WTypography>
          </WCol>
        </WRow>

        {/* Actions */}
        <WRow justify='center' gap='md' className='mb-12'>
          <WCol className='w-full md:w-auto'>
            <WButton variant='primary' fullWidth>
              Начать
            </WButton>
          </WCol>
          <WCol className='w-full md:w-auto'>
            <WButton variant='outline' fullWidth>
              Узнать больше
            </WButton>
          </WCol>
        </WRow>

        {/* Features */}
        <WRow gap='lg' justify='center'>
          {features.map((feature, index) => (
            <WCol key={index} className='w-full md:w-1/3'>
              <WCard padding='lg' className='h-full'>
                <div className='text-center'>
                  <div className='text-4xl mb-3'>{feature.icon}</div>
                  <WTypography variant='h3' className='mb-2'>
                    {feature.title}
                  </WTypography>
                  <WTypography variant='body' color='secondary'>
                    {feature.description}
                  </WTypography>
                </div>
              </WCard>
            </WCol>
          ))}
        </WRow>
      </div>
    </WContainer>
  );
};

const features = [
  { icon: '💰', title: 'Учёт расходов', description: 'Отслеживайте все траты в одном месте' },
  { icon: '📊', title: 'Аналитика', description: 'Детальные отчёты и графики' },
  { icon: '🎯', title: 'Цели', description: 'Ставьте и достигайте финансовые цели' },
];

export default HomePage;
