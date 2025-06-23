import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
      <div className="bg-dark min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Страница не найдена</h2>
          <p className="text-light-muted mb-8">
            Страница, которую вы ищете, не существует или была перемещена.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/')}
            >
              На главную
            </Button>
            <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/products')}
            >
              Просмотреть товары
            </Button>
          </div>
        </div>
      </div>
  );
};

export default NotFoundPage;
