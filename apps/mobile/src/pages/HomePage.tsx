import React from 'react';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Button, Card, Col, Container, Row, Typography } from '@fintrack-pro/shared/ui/mobile';

export const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <Container safeArea>
      <ScrollView className='flex-1 py-8'>
        <Col className='items-center mb-8'>
          <Typography variant='h1' className='text-center mb-2'>
            FinTrack Pro
          </Typography>
          <Typography variant='body' color='secondary' className='text-center'>
            Умный способ управлять финансами
          </Typography>
        </Col>

        <Row justify='center' gap='md' className='mb-8'>
          <Col className='w-1/2'>
            <Button variant='primary' onClick={router.navigate} context={'/test-store'}>
              Store Test
            </Button>
          </Col>
          <Col className='w-1/2'>
            <Button variant='outline' onClick={router.navigate} context={'/query-test'}>
              Query Test
            </Button>
          </Col>
        </Row>

        <Row gap='lg' justify='center' className='flex-wrap'>
          {features.map((feature, index) => (
            <Col key={index} className='w-full mb-4'>
              <Card padding='lg'>
                <Col className='items-center'>
                  <Typography variant='h1' className='text-4xl mb-3'>
                    {feature.icon}
                  </Typography>
                  <Typography variant='h3' className='text-center mb-2'>
                    {feature.title}
                  </Typography>
                  <Typography variant='body' color='secondary' className='text-center'>
                    {feature.description}
                  </Typography>
                </Col>
              </Card>
            </Col>
          ))}
        </Row>
      </ScrollView>
    </Container>
  );
};

const features = [
  { icon: '💰', title: 'Учёт расходов', description: 'Отслеживайте все траты в одном месте' },
  { icon: '📊', title: 'Аналитика', description: 'Детальные отчёты и графики' },
  { icon: '🎯', title: 'Цели', description: 'Ставьте и достигайте финансовые цели' },
];

export default HomePage;
