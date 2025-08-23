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
  description: string;
  location: string;
  photo: string;
}

export const Petcard = ({ name, age, description, location, photo }: Props) => {
  return (
    <Card className="w-72">
      <CardHeader>
        <div className="w-full aspect-square relative">
          <Image src={photo} alt="" fill className="object-cover" />
        </div>
        <CardTitle className="mt-3">
          <span className="border-b bg-gray-50">
            {name} - {age}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardContent>
        <small>{location}</small>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-blue-600 text-white hover:bg-blue-900 cursor-pointer">
          Adoptame!
        </Button>
      </CardFooter>
    </Card>
  );
};
