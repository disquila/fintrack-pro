import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Col, Container, Row, Typography } from '@fintrack-pro/shared/ui/web';

export const HomePage: React.FC = () => {
  return (
    <Container>
      <div className='py-8'>
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
            <Link to='/test-store'>
              <Button variant='primary' fullWidth>
                Store Test
              </Button>
            </Link>
          </Col>
          <Col className='w-1/2'>
            <Link to='/query-test'>
              <Button variant='outline' fullWidth>
                Query Test
              </Button>
            </Link>
          </Col>
        </Row>

        <Row gap='lg' justify='center' className='flex-wrap'>
          {features.map((feature, index) => (
            <Col key={index} className='w-full md:w-1/3 mb-4'>
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
      </div>
    </Container>
  );
};

const features = [
  { icon: '💰', title: 'Учёт расходов', description: 'Отслеживайте все траты в одном месте' },
  { icon: '📊', title: 'Аналитика', description: 'Детальные отчёты и графики' },
  { icon: '🎯', title: 'Цели', description: 'Ставьте и достигайте финансовые цели' },
];

export default HomePage;
