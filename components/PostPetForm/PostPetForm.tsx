'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';

const formSchema = z
  .object({
    petname: z.string().min(2).max(50),
    age: z.number().min(1),
    ageType: z.enum(['years', 'months']),
    petType: z.enum(['Dog', 'Cat', 'Bird', 'Rodent', 'Other']),
    description: z.string().min(10).max(200),
    hasIllnes: z.boolean(),
    illnesDescription: z.string().optional(),
    needMedications: z.boolean(),
    medicationDescription: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasIllnes && !data.illnesDescription) {
        return false;
      }

      return true;
    },
    {
      message: 'Illness description is required',
      path: ['illnesDescription'],
    },
  )
  .refine(
    (data) => {
      if (data.needMedications && !data.medicationDescription) {
        return false;
      }
      return true;
    },
    {
      message: 'Medication description is required',
      path: ['medicationDescription'],
    },
  );

const PostPetForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petname: '',
      age: 0,
      ageType: 'years',
      petType: 'Dog',
      description: '',
      hasIllnes: false,
      illnesDescription: '',
      needMedications: false,
      medicationDescription: '',
    },
  });

  const hasIllnes = form.watch('hasIllnes');
  const needMedication = form.watch('needMedications');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="petname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of the pet</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name of the pet"
                    {...field}
                    className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age of the pet</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Age"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                    className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ageType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select age type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 shadow-lg rounded-md">
                    <SelectItem
                      value="months"
                      className="hover:bg-blue-50 focus:bg-blue-100"
                    >
                      Months
                    </SelectItem>
                    <SelectItem
                      value="years"
                      className="hover:bg-blue-50 focus:bg-blue-100"
                    >
                      Years
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select pet type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 shadow-lg rounded-md">
                    <SelectItem
                      value="Dog"
                      className="hover:bg-blue-50 focus:bg-blue-100"
                    >
                      Dog
                    </SelectItem>
                    <SelectItem
                      value="Cat"
                      className="hover:bg-blue-50 focus:bg-blue-100"
                    >
                      Cat
                    </SelectItem>
                    <SelectItem
                      value="Bird"
                      className="hover:bg-blue-50 focus:bg-blue-100"
                    >
                      Bird
                    </SelectItem>
                    <SelectItem
                      value="Rodent"
                      className="hover:bg-blue-50 focus:bg-blue-100"
                    >
                      Rodent
                    </SelectItem>
                    <SelectItem
                      value="Other"
                      className="hover:bg-blue-50 focus:bg-blue-100"
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="A description of the pet"
                  {...field}
                  className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="hasIllnes"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-50">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-medium">
                    Pet has illness?
                  </FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Check if the pet has any medical condition
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {hasIllnes && (
            <FormField
              control={form.control}
              name="illnesDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Illness Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe the illness..."
                      {...field}
                      className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="needMedications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-50">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-medium">
                    Needs medications?
                  </FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Check if the pet requires medication
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {needMedication && (
            <FormField
              control={form.control}
              name="medicationDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Medication Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe the medications needed..."
                      {...field}
                      className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PostPetForm;
