import React from 'react';
import { ScrollView } from 'react-native';
import { MButton, MCard, MCol, MContainer, MRow, MTypography } from '@fintrack-pro/ui-kit';
import { useRouter } from 'expo-router';

export const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <MContainer safeArea>
      <ScrollView className='flex-1 py-8'>
        <MCol className='items-center mb-8'>
          <MTypography variant='h1' className='text-center mb-2'>
            FinTrack Pro
          </MTypography>
          <MTypography variant='body' color='secondary' className='text-center'>
            Умный способ управлять финансами
          </MTypography>
        </MCol>

        <MRow justify='center' gap='md' className='mb-8'>
          <MCol className='w-1/2'>
            <MButton variant='primary' onClick={router.navigate} context={'/test-store'}>
              Store Test
            </MButton>
          </MCol>
          <MCol className='w-1/2'>
            <MButton variant='outline' onClick={router.navigate} context={'/query-test'}>
              Query Test
            </MButton>
          </MCol>
        </MRow>

        <MRow gap='lg' justify='center' className='flex-wrap'>
          {features.map((feature, index) => (
            <MCol key={index} className='w-full mb-4'>
              <MCard padding='lg'>
                <MCol className='items-center'>
                  <MTypography variant='h1' className='text-4xl mb-3'>
                    {feature.icon}
                  </MTypography>
                  <MTypography variant='h3' className='text-center mb-2'>
                    {feature.title}
                  </MTypography>
                  <MTypography variant='body' color='secondary' className='text-center'>
                    {feature.description}
                  </MTypography>
                </MCol>
              </MCard>
            </MCol>
          ))}
        </MRow>
      </ScrollView>
    </MContainer>
  );
};

const features = [
  { icon: '💰', title: 'Учёт расходов', description: 'Отслеживайте все траты в одном месте' },
  { icon: '📊', title: 'Аналитика', description: 'Детальные отчёты и графики' },
  { icon: '🎯', title: 'Цели', description: 'Ставьте и достигайте финансовые цели' },
];

export default HomePage;
