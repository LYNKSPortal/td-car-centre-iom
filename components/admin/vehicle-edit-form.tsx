'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Vehicle = {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  bodyType: string;
  drivetrain: string | null;
  colour: string | null;
  interiorColour: string | null;
  engineSize: string | null;
  doors: number | null;
  seats: number | null;
  previousOwners: number | null;
  height: string | null;
  length: string | null;
  width: string | null;
  description: string | null;
  status: string;
};

export function VehicleEditForm({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: vehicle.title,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    mileage: vehicle.mileage,
    transmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    bodyType: vehicle.bodyType,
    drivetrain: vehicle.drivetrain || '',
    colour: vehicle.colour || '',
    interiorColour: vehicle.interiorColour || '',
    engineSize: vehicle.engineSize || '',
    doors: vehicle.doors || 4,
    seats: vehicle.seats || 5,
    previousOwners: vehicle.previousOwners || 0,
    height: vehicle.height || '',
    length: vehicle.length || '',
    width: vehicle.width || '',
    description: vehicle.description || '',
    status: vehicle.status,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/vehicles/${vehicle.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to update vehicle');
      }

      router.push('/admin/dashboard/vehicles');
      router.refresh();
    } catch (err) {
      console.error('Update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="make">Make *</Label>
          <select
            id="make"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md text-white"
            required
          >
            <option value="">Select Make</option>
            <option value="Aston Martin">Aston Martin</option>
            <option value="Audi">Audi</option>
            <option value="Bentley">Bentley</option>
            <option value="BMW">BMW</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Chrysler">Chrysler</option>
            <option value="Citroën">Citroën</option>
            <option value="Dacia">Dacia</option>
            <option value="Daihatsu">Daihatsu</option>
            <option value="Dodge">Dodge</option>
            <option value="Eagle">Eagle</option>
            <option value="Excalibur">Excalibur</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Fiat">Fiat</option>
            <option value="Fisker">Fisker</option>
            <option value="Ford">Ford</option>
            <option value="Genesis">Genesis</option>
            <option value="Ginetta">Ginetta</option>
            <option value="GMC">GMC</option>
            <option value="Haval">Haval</option>
            <option value="Honda">Honda</option>
            <option value="Hummer">Hummer</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Infiniti">Infiniti</option>
            <option value="Isuzu">Isuzu</option>
            <option value="Iveco">Iveco</option>
            <option value="Jaguar">Jaguar</option>
            <option value="Jeep">Jeep</option>
            <option value="Kia">Kia</option>
            <option value="Koenigsegg">Koenigsegg</option>
            <option value="Lamborghini">Lamborghini</option>
            <option value="Lancia">Lancia</option>
            <option value="Land Rover">Land Rover</option>
            <option value="Lexus">Lexus</option>
            <option value="Lincoln">Lincoln</option>
            <option value="Lotus">Lotus</option>
            <option value="Maserati">Maserati</option>
            <option value="Mazda">Mazda</option>
            <option value="McLaren">McLaren</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="MG">MG</option>
            <option value="MINI">MINI</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Morgan">Morgan</option>
            <option value="Nissan">Nissan</option>
            <option value="Oldsmobile">Oldsmobile</option>
            <option value="Opel">Opel</option>
            <option value="Pagani">Pagani</option>
            <option value="Peugeot">Peugeot</option>
            <option value="Polestar">Polestar</option>
            <option value="Pontiac">Pontiac</option>
            <option value="Porsche">Porsche</option>
            <option value="Qoros">Qoros</option>
            <option value="Radical">Radical</option>
            <option value="Range Rover">Range Rover</option>
            <option value="Renault">Renault</option>
            <option value="Riley">Riley</option>
            <option value="Rolls-Royce">Rolls-Royce</option>
            <option value="Rover">Rover</option>
            <option value="Saab">Saab</option>
            <option value="SEAT">SEAT</option>
            <option value="Škoda">Škoda</option>
            <option value="Smart">Smart</option>
            <option value="SsangYong">SsangYong</option>
            <option value="Subaru">Subaru</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Tata">Tata</option>
            <option value="Tesla">Tesla</option>
            <option value="Toyota">Toyota</option>
            <option value="Triumph">Triumph</option>
            <option value="TVR">TVR</option>
            <option value="Ultima">Ultima</option>
            <option value="Vauxhall">Vauxhall</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Volvo">Volvo</option>
            <option value="Westfield">Westfield</option>
            <option value="Wiesmann">Wiesmann</option>
            <option value="Zenvo">Zenvo</option>
          </select>
        </div>

        <div>
          <Label htmlFor="model">Model *</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
          />
        </div>

        <div>
          <Label htmlFor="mileage">Mileage *</Label>
          <Input
            id="mileage"
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
            required
          />
        </div>

        <div>
          <Label htmlFor="transmission">Transmission *</Label>
          <select
            id="transmission"
            value={formData.transmission}
            onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md text-white"
            required
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
        </div>

        <div>
          <Label htmlFor="fuelType">Fuel Type *</Label>
          <select
            id="fuelType"
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md text-white"
            required
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
          </select>
        </div>

        <div>
          <Label htmlFor="bodyType">Body Type *</Label>
          <select
            id="bodyType"
            value={formData.bodyType}
            onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md text-white"
            required
          >
            <option value="Saloon">Saloon</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Estate">Estate</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
            <option value="MPV">MPV</option>
            <option value="Crossover (CUV)">Crossover (CUV)</option>
            <option value="Convertible SUV">Convertible SUV</option>
            <option value="Coupe SUV">Coupe SUV</option>
            <option value="Hatchback SUV">Hatchback SUV</option>
            <option value="Electric (EV)">Electric (EV)</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Pickup Truck">Pickup Truck</option>
            <option value="Off-road (4x4)">Off-road (4x4)</option>
            <option value="Luxury Saloon">Luxury Saloon</option>
            <option value="Sports Car">Sports Car</option>
            <option value="Supercar">Supercar</option>
            <option value="Hypercar">Hypercar</option>
            <option value="Roadster">Roadster</option>
            <option value="Fastback">Fastback</option>
            <option value="Shooting Brake">Shooting Brake</option>
            <option value="Microcar">Microcar</option>
            <option value="City Car">City Car</option>
          </select>
        </div>

        <div>
          <Label htmlFor="colour">External Colour</Label>
          <Input
            id="colour"
            value={formData.colour}
            onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="interiorColour">Internal Colour</Label>
          <Input
            id="interiorColour"
            value={formData.interiorColour}
            onChange={(e) => setFormData({ ...formData, interiorColour: e.target.value })}
            placeholder="e.g., Beige"
          />
        </div>

        <div>
          <Label htmlFor="engineSize">Engine Size</Label>
          <Input
            id="engineSize"
            value={formData.engineSize}
            onChange={(e) => setFormData({ ...formData, engineSize: e.target.value })}
            placeholder="e.g., 2.0L"
          />
        </div>

        <div>
          <Label htmlFor="doors">Doors</Label>
          <Input
            id="doors"
            type="number"
            value={formData.doors}
            onChange={(e) => setFormData({ ...formData, doors: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="seats">Seats</Label>
          <Input
            id="seats"
            type="number"
            value={formData.seats}
            onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="previousOwners">Previous Owners</Label>
          <Input
            id="previousOwners"
            type="number"
            value={formData.previousOwners}
            onChange={(e) => setFormData({ ...formData, previousOwners: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            placeholder="e.g., 1850mm"
          />
        </div>

        <div>
          <Label htmlFor="length">Length</Label>
          <Input
            id="length"
            value={formData.length}
            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
            placeholder="e.g., 4900mm"
          />
        </div>

        <div>
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            value={formData.width}
            onChange={(e) => setFormData({ ...formData, width: e.target.value })}
            placeholder="e.g., 1904mm"
          />
        </div>

        <div>
          <Label htmlFor="status">Status *</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md text-white"
            required
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md text-white"
        />
      </div>

      <div className="flex gap-3 pt-6 border-t border-white/10">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/dashboard/vehicles')}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
