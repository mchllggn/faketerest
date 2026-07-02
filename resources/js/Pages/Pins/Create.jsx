import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { toast } from "sonner";
import TextInput from "@/Components/TextInput";

export default function Create() {
  const { flash } = usePage().props;
  const [preview, setPreview] = useState(null);
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    description: "",
    image: null,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("pins.store"), {
      forceFormData: true,
      onSuccess: (page) => {
        reset("title", "description", "image");
        setPreview(null);
        toast.success(page.props.flash.success);
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <AuthenticatedLayout title="Create">
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form onSubmit={submit} className="grid gap-6 md:grid-cols-2">
                <div className="order-2 md:order-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <TextInput
                      type="text"
                      name="title"
                      value={data.title}
                      onChange={(e) => setData("title", e.target.value)}
                      required
                    />
                    <InputError message={errors.title} className="mt-2" />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={data.description}
                      onChange={(e) => setData("description", e.target.value)}
                      rows={4}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-chaeyoung focus:ring-chaeyoung"
                    />
                    <InputError message={errors.description} className="mt-2" />
                  </div>

                  <div className="flex justify-end mt-4">
                    <PrimaryButton>Create</PrimaryButton>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload image
                  </label>
                  <div className="flex items-center justify-center w-full h-56 mt-1 overflow-hidden border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                    {preview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={preview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black opacity-0 bg-opacity-30 hover:opacity-100">
                          <label
                            htmlFor="image-upload"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700"
                          >
                            Change image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                        >
                          Select an image
                        </label>
                        <p className="mt-2 text-xs text-gray-500">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                  </div>
                  <InputError message={errors.image} className="mt-2" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
