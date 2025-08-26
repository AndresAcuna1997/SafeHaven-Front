import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';

interface Props {
  name: string;
  age: number;
  ageType: 'Years' | 'Months';
  description: string;
  location: string;
  photo: string;
}

export const Petcard = ({
  name,
  age,
  ageType,
  description,
  location,
  photo,
}: Props) => {
  return (
    <Card className="w-72 bg-white" role="article">
      <CardHeader>
        <div className="w-full aspect-square relative">
          <Image src={photo} alt="" fill className="object-cover" />
        </div>
        <CardTitle className="mt-3">
          <span className="border-b bg-gray-50">
            {name} - {age} {ageType}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 h-19">{description}</p>
      </CardContent>
      <CardContent>
        <small>{location}</small>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-blue-600 text-white hover:bg-blue-900 cursor-pointer">
          Adopt me!
        </Button>
      </CardFooter>
    </Card>
  );
};
