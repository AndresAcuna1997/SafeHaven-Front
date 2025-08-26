'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchPetDetails } from '@/lib/api/petDetails';
import { Pet } from '@/types/pet';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function Page() {
  const { id } = useParams();

  const { data, isPending, error } = useQuery<Pet>({
    queryKey: ['pet-details', +id!],
    queryFn: () => fetchPetDetails(+id!),
    enabled: !!id,
  });

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Pet Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, we could not find the data for this pet at the moment!
          </p>
          <Link href="/pets">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">
            Sorry, there was an error loading this pets details.
          </p>
          <Link href="/pets">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Pet Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            This pet does not exist in our database.
          </p>
          <Link href="/pets">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/pets">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pets
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={data.photo}
                alt={`Photo of ${data.name}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-800">
                      {data.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-sm">
                        {data.petType}
                      </Badge>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {data.age} {data.ageType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{data.location}</span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      About {data.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {data.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                      <Heart className="mr-2 h-4 w-4" />
                      Adopt {data.name}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pet Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Type:</span>
                    <p className="text-gray-800">{data.petType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Age:</span>
                    <p className="text-gray-800">
                      {data.age} {data.ageType}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Location:</span>
                    <p className="text-gray-800">{data.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
