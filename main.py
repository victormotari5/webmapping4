import json

def read_data_from_file():
    data = []
    with open('data.txt', 'r') as f:
        for line in f:
            name, lat, lon, area, county = line.strip().split(',')
            data.append({
                "name": name,
                "latitude": float(lat),
                "longitude": float(lon),
                "area_sq_km": area,
                "county": county
            })
    return data

def save_data_to_json(data, filename='data.json'):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

if __name__ == '__main__':
    data = read_data_from_file()
    save_data_to_json(data)
    print(f"Data has been written to data.json")
