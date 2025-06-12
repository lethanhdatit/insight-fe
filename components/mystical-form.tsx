"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AncientLoading from "./ancient-loading";
import AncientResultDisplay from "./ancient-result-display";
import { apiCall } from "@/helpers/apiHelper";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: number;
  religion: number;
  location: string;
  dreaming: string;
}

interface MysticalFormProps {
  dictionary: any;
}

export default function MysticalForm({ dictionary }: MysticalFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: 1,
    religion: 1,
    location: "",
    dreaming: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Create a ref to store the audio object
  const audioAncientBellRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await apiCall("/api/theology", "POST", formData, true);

      setResult(data);

      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      if (!audioAncientBellRef.current) {
        audioAncientBellRef.current = new Audio("/sounds/ancient-bell.mp3");
        audioAncientBellRef.current.volume = 0.4;
        audioAncientBellRef.current.loop = true;
      }
      // Play the audio
      audioAncientBellRef.current?.play().catch(() => {});
    } else {
      if (audioAncientBellRef.current) {
        audioAncientBellRef.current.pause();
        audioAncientBellRef.current.currentTime = 0;
      }
    }
  }, [isLoading]);

  // Cleanup audio when component is unmounted
  useEffect(() => {
    return () => {
      if (audioAncientBellRef.current) {
        audioAncientBellRef.current.pause();
        audioAncientBellRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (showResult && result) {
    return <AncientResultDisplay result={result} dictionary={dictionary} />;
  }

  if (isLoading) {
    return <AncientLoading dictionary={dictionary} />;
  }

  return (
    <div className="w-full min-w-6xl max-w-8xl mx-auto">
      {/* Ancient Book Design */}
      <div className="ancient-book rounded-lg p-8 book-spine scroll-unfurl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Page */}
          <div className="parchment rounded-lg p-6">
            <div className="space-y-6">
              <div className="text-center border-b-2 border-amber-600 pb-4">
                <h2 className="calligraphy-font text-2xl text-amber-800 font-bold">                  
                  {dictionary.form.title}
                </h2>
              </div>

              {/* Name Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="ancient-font text-amber-800 font-medium"
                    >
                      {dictionary.form.lastName}
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="ancient-input ancient-font"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="middleName"
                      className="ancient-font text-amber-800 font-medium"
                    >
                      {dictionary.form.middleName}
                    </Label>
                    <Input
                      id="middleName"
                      value={formData.middleName}
                      onChange={(e) =>
                        handleInputChange("middleName", e.target.value)
                      }
                      className="ancient-input ancient-font"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="ancient-font text-amber-800 font-medium"
                    >
                      {dictionary.form.firstName}
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="ancient-input ancient-font"
                      required
                    />
                  </div>
                </div>

                {/* Date and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="dob"
                      className="ancient-font text-amber-800 font-medium"
                    >
                      {dictionary.form.dateOfBirth}
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                      className="ancient-input ancient-font"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="ancient-font text-amber-800 font-medium">
                      {dictionary.form.gender}
                    </Label>
                    <Select
                      value={formData.gender.toString()}
                      onValueChange={(value) =>
                        handleInputChange("gender", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger className="ancient-input ancient-font">
                        <SelectValue placeholder={dictionary.form.genderPlaceholder}/>
                      </SelectTrigger>
                      <SelectContent className="bg-amber-50 border-amber-600 max-h-60 overflow-y-auto">
                        {dictionary.genders.map(
                          (gender: { value: number; label: string }) => (
                            <SelectItem
                              key={gender.value}
                              value={gender.value.toString()}
                              className="ancient-font text-amber-800 hover:bg-amber-100"
                            >
                              {gender.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Religion */}
                <div className="space-y-2">
                  <Label className="ancient-font text-amber-800 font-medium">
                    {dictionary.form.religion}
                  </Label>
                  <Select
                    value={formData.religion.toString()}
                    onValueChange={(value) =>
                      handleInputChange("religion", Number.parseInt(value))
                    }
                  >
                    <SelectTrigger className="ancient-input ancient-font">
                      <SelectValue placeholder={dictionary.form.religionPlaceholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-amber-50 border-amber-600 max-h-60 overflow-y-auto">
                      {dictionary.religions.map(
                        (religion: { value: number; label: string }) => (
                          <SelectItem
                            key={religion.value}
                            value={religion.value.toString()}
                            className="ancient-font text-amber-800 hover:bg-amber-100"
                          >
                            {religion.label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="ancient-font text-amber-800 font-medium"
                  >
                    {dictionary.form.location}
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="ancient-input ancient-font"
                    placeholder={dictionary.form.locationExample}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Page */}
          <div className="parchment rounded-lg p-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 h-full flex flex-col"
            >
              <div className="text-center border-b-2 border-amber-600 pb-4">
                <h2 className="calligraphy-font text-2xl text-amber-800 font-bold">
                  Giấc Mơ Huyền Bí
                </h2>
              </div>

              {/* Dream Description */}
              <div className="space-y-2 flex-1">
                <Label
                  htmlFor="dreaming"
                  className="ancient-font text-amber-800 font-medium"
                >
                  {dictionary.form.dreamDescription}
                </Label>
                <Textarea
                  id="dreaming"
                  value={formData.dreaming}
                  onChange={(e) =>
                    handleInputChange("dreaming", e.target.value)
                  }
                  placeholder={dictionary.form.dreamPlaceholder}
                  className="ancient-input ancient-font min-h-64 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button
                  type="submit"
                  className="ancient-button ancient-font text-xl py-4 px-12 rounded-lg"
                >
                  🔮 {dictionary.form.submitButton} 🔮
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
