states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL',
  'IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV',
  'NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX',
  'UT','VT','VA','WA','WV','WI','WY']

# build array of all us city, states
# for each state
  # fetch json from api
    # http://gomashup.com/json.php?fds=geo/usa/zipcode/state/CA&jsoncallback=
  # add city, state to array
    # array.push("{object['City']}, #{object['State']}")
# write array to json file

# Data
# ({
#   "result":[
#   {
#     "Longitude" : "-118.248405",
#     "Zipcode" : "90001",
#     "ZipClass" : "STANDARD",
#     "County" : "LOS ANGELES",
#     "City" : "LOS ANGELES",
#     "State" : "CA",
#     "Latitude" : "+33.973951"
#   }
# })
require 'net/http'
require 'json'

def decapitalize(string)
  string.split(' ').map { |word| word.downcase.capitalize }.join(' ')
end

output = []

states.each do |state|
  url = URI.parse("http://gomashup.com/json.php?fds=geo/usa/zipcode/state/#{state}&jsoncallback=")
  req = Net::HTTP::Get.new(url.to_s)
  res = Net::HTTP.start(url.host, url.port) {|http|
    http.request(req)
  }

  string = res.body[1...-1]
  data = JSON.parse(string)
  cities = data["result"].map do |object|
    puts object["City"] if object["City"] == "GRAND JUNCTION"
    "#{decapitalize(object['City'])}, #{object['State']}"
  end.uniq
  output.push(*cities)
  puts "#{state} complete"
end

File.open('cities.txt', 'w') { |file| file.write(output)}
